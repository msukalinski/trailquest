import { supabase } from "../lib/supabase";

export async function getProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
}

export async function getTrails() {
    const { data, error } = await supabase
        .from('trails')
        .select('*');

    if (error) {
        throw error;
    }

    return data;
}

export async function getMyTrails(userId) {
    const { data, error } = await supabase
        .from('trails')
        .select('*')
        .eq('ownerId', userId);

    if (error) {
        throw error;
    }

    return data;
}

export async function getLatestTrails() {
    const { data, error } = await supabase
        .from('trails')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(3);

    if (error) {
        throw error;
    }

    return data;
}

export async function getTrailById(id) {
    const { data, error } = await supabase
        .from('trails')
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        return null;
    }

    const owner = data.ownerId
        ? await getProfile(data.ownerId)
        : null;

    return { ...data, owner };
}

export async function createTrail(newTrail) {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
        throw authError;
    }

    if (!user) {
        throw new Error("Sign in to create trail");

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

    if(!updatedTrail) {
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
        throw new Error("Trail was not found pr you cannot delete it");
    }

    return data;
}