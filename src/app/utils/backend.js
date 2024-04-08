

export const search_similar_quran_verses = async (query, limit) => {
    const payload = JSON.stringify({
        'query': query,
        'limit': limit
    })
    const query_data = await fetch("/api/query", {
        method: 'POST',
        body: payload,
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => response.json())
        .catch(e => {
            return []
        })

    return query_data
}


export const get_explanations = async (chapter_no, start_verse_no, limit) => {
    const payload = JSON.stringify({
        'chapter_no': chapter_no,
        'start_verse_no': start_verse_no,
        'limit': limit
    })
    const query_data = await fetch("/api/getTafsir", {
        method: 'POST',
        body: payload,
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => response.json())
        .catch(e => [])

    return query_data
}

export const get_projection = async () => {
    const data = await fetch("/api/getProjection", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => response.json())
        .catch(e => [])

    return data
}

