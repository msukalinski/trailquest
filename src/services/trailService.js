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
    const { data, error } = await supabase
        .from('trails')
        .insert(newTrail)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
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