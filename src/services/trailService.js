import { supabase } from "../lib/supabase";

export async function getProfile(userId, signal) {
    const query = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

    if (signal) {
        query.abortSignal(signal);
    }

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    return data;
}

export async function getTrails(signal, {
    search = '',
    region = '',
    difficulty = '',
    sort = 'newest',
} = {},
    page = 1,
    PAGE_SIZE = 6) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
        .from('trails')
        .select('*', { count: 'exact' })
        .range(from, to);

    const searchText = search.trim();

    if (searchText) {
        query = query.ilike('title', `%${searchText}%`);
    }

    if (region) {
        query = query.eq('region', region);
    }

    if (difficulty) {
        query = query.eq('difficulty', difficulty);
    }

    if (sort === 'distance-asc') {
        query = query.order('distance', { ascending: true });
    } else if (sort === 'distance-desc') {
        query = query.order('distance', { ascending: false });
    } else if (sort === 'oldest') {
        query = query.order('createdAt', { ascending: true });
    } else {
        query = query.order('createdAt', { ascending: false });
    }

    if (signal) {
        query.abortSignal(signal);
    }

    const { data, error, count } = await query;

    if (error) {
        throw error;
    }

    return {
        trails: data,
        totalCount: count,
    };
}

export async function getMyTrails(userId, signal, { sort = 'newest' } = {}) {
    let query = supabase
        .from('trails')
        .select('*')
        .eq('ownerId', userId);

    if (sort === 'newest') {
        query.order('createdAt', { ascending: false });
    } else {
        query.order('createdAt', { ascending: true });
    }

    if (signal) {
        query.abortSignal(signal);
    }

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    return data;
}

export async function getLatestTrails(signal) {
    const query = supabase
        .from('trails')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(3);

    if (signal) {
        query.abortSignal(signal);
    }

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    return data;
}

export async function getTrailById(id, signal) {
    const query = supabase
        .from('trails')
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (signal) {
        query.abortSignal(signal);
    }

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    if (!data) {
        return null;
    }

    const owner = data.ownerId
        ? await getProfile(data.ownerId, signal)
        : null;

    return { ...data, owner };
}

export async function createTrail(newTrail) {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
        throw authError;
    }

    if (!user) {
        throw new Error("Log in to create trail.");

    }

    const { data, error } = await supabase
        .from('trails')
        .insert({ ...newTrail, ownerId: user.id })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export async function updateTrail(trailId, change) {
    const { data: updatedTrail, error } = await supabase
        .from('trails')
        .update({ ...change })
        .eq('id', trailId)
        .select('id')
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!updatedTrail) {
        throw new Error('Trail not found or you cannot edit it.');
    }

    return updatedTrail;
}

export async function deleteTrail(id) {
    const { data, error } = await supabase
        .from('trails')
        .delete()
        .eq('id', id)
        .select('id')
        .maybeSingle();

    console.log('trail:', { data, error });

    if (error) {
        throw (error);
    }

    if (!data) {
        throw new Error("Trail was not found or you cannot delete it.");
    }

    return data;
}