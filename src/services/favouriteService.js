import { supabase } from "../lib/supabase";

export async function isTrailSaved(trailId, userId, signal) {
    if (!userId) {
        return false;
    }

    let query = supabase
        .from('favourites')
        .select('trailId')
        .eq('trailId', trailId)
        .eq('userId', userId)
        .maybeSingle();

    if (signal) {
        query = query.abortSignal(signal);
    }

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    return Boolean(data);
}

export async function saveTrail(trailId, userId) {
    if (!userId) {
        throw new Error('Please log in to save trails.');
    }

    const { data, error } = await supabase
        .from('favourites')
        .insert({ trailId, userId })
        .select('trailId')
        .single();

    if (error) {
        throw (error);
    }

    return data;
}

export async function unsaveTrail(trailId, userId) {
    if (!userId) {
        throw new Error('Please log in to manage saved trails.');
    }

    const { data, error } = await supabase
        .from('favourites')
        .delete()
        .eq('trailId', trailId)
        .eq('userId', userId)
        .select('trailId')
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
}

export async function getTotalFavouritesReceived(userId, signal) {
    let query = supabase
        .from('favourites')
        .select('trailId, trails!inner(ownerId)', {
            count: 'exact',
            head: true
        })
        .eq('trails.ownerId', userId);

    if (signal) {
        query = query.abortSignal(signal);
    }

    const { count, error } = await query


    if (error) {
        throw (error);
    }

    return count ?? 0;
}