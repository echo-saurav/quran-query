
export async function POST(req: Request) {
  const data = await req.json()
  const chapter_no = data.chapter_no
  const start_verse_no = data.start_verse_no
  const limit = data.limit ? data.limit : 10


  if (chapter_no && start_verse_no) {

    const payload = JSON.stringify({
      'chapter_no': chapter_no,
      'start_verse_no': start_verse_no,
      'limit': limit
    })

    const query_data = await fetch(`${process.env.WEAVIATE_API}/api/tafsir`, {
      method: 'POST',
      body: payload,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(response => response.json())
      .catch(e => { return [] })

    return Response.json(query_data)

  }
  return Response.json([])


}

