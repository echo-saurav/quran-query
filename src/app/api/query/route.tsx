
export async function POST(req: Request) {
  const data = await req.json()
  const query = data.query
  const limit = data.limit ? data.limit : 10

  if (query) {

    const payload = JSON.stringify({
      'query': query,
      'limit': limit
    })

    const query_data = await fetch(`${process.env.WEAVIATE_API}/api/query/ayah`, {
      method: 'POST',
      body: payload,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(response => response.json())
      .catch(e => {
        console.log(`query error for ${query} in ${process.env.WEAVIATE_API}`, e)
        return []
      })

    return Response.json(query_data)
  }
  return Response.json([])

}

