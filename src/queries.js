import { gql } from 'apollo-boost';

export const moviesAndDirectors = gql`
  query moviesQuery {
    movies {
        id
        name
        genre
    },
    directors {
      id
      name
      age
    }
  }
`;