import { useEffect, useState } from "react"
import { client } from "../client"
import { Spinner } from "../components"
import { feedQuery, searchQuery } from "../utils/data"
import MasonryLayout from "./MasonryLayout"
import NoPinsFound from "./NoPinsFound"

const Search = ({ searchTerm }) => {
  // searched pins state
  const [pins, setPins] = useState(null)
  // loading state
  const [loading, setLoading] = useState(true)

  // fetch searched pin(s)
  useEffect(() => {
    if (searchTerm) {
      // render loader
      setLoading(true)
      // fetch searched pin
      const query = searchQuery(searchTerm.toLowerCase())
      client.fetch(query).then(data => {
        setPins(data)
        setLoading(false)
      })
    } else {
      // if searchTerm is null show default feed
      client.fetch(feedQuery).then(data => {
        setPins(data)
        setLoading(false)
      })
    }
  }, [searchTerm])

  return (
    <div>
      {/* loading spinner */}
      {loading && <Spinner message={`Searching for ${searchTerm}`} />}
      {/* if pins found display pins */}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {/* if pins not found display no pins found */}
      {pins?.length === 0 && searchTerm !== "" && !loading && <NoPinsFound />}
    </div>
  )
}

export default Search
