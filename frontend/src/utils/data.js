// fetch user details
export const userQuery = userId => {
  const query = `*[_type == 'user' && _id == '${userId}']`
  return query
}

// fetch all pins
export const feedQuery = `*[_type == 'pin'] | order(_createdAt desc) {
  image { 
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    username,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      username,
      image
    },
  },
}`

// fetch pins based on search term
export const searchQuery = searchTerm => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
    image { 
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      username,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        username,
        image
      },
    },
  }`
  return query
}
