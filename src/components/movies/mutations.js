import {gql} from "apollo-boost";

export const addMovieMutation = gql`
    mutation addMovie($name: String!, $genre: String!) {
        addMovie(name: $name, genre: $genre) {
            name
        }
    }
`;

export const deleteMovieMutation = gql`
    mutation deleteMovie($id: ID) {
        deleteMovie(id: $id) {
            id
        }
    }   
`;

export const updateMovieMutation = gql`
    mutation updateMovie($id: ID, $name: String!, $genre: String!) {
        updateMovie(id: $id, name: $name, genre: $genre) {
            name
        }
    }
`;