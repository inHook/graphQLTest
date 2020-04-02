import {graphql} from "react-apollo";
import {compose} from 'recompose';

import {addMovieMutation, deleteMovieMutation, updateMovieMutation} from "./mutations";
import {moviesQuery} from "./queries";

const withGraphQl = compose(
    graphql(moviesQuery, {
        options: ({name = ""}) => ({
            variables: {name},
        })
    }),
    graphql(addMovieMutation, {
        props: ({mutate}) => ({
            addMovie: movie => mutate({
                variables: movie,
                refetchQueries: [{
                    query: moviesQuery,
                    variables: {
                        name: "",
                    },
                }],
            })
        })
    }),
    graphql(deleteMovieMutation, {
        props: ({mutate}) => ({
            deleteMovie: id => mutate({
                variables: id,
                refetchQueries: [{
                    query: moviesQuery,
                    variables: {
                        name: "",
                    },
                }]
            })
        })
    }),
    graphql(updateMovieMutation, {
        props: ({mutate}) => ({
            updateMovie: movie => mutate({
                variables: movie,
                refetchQueries: [{
                    query: moviesQuery,
                    variables: {
                        name: "",
                    },
                }]
            })
        })
    }),
);

export const MoviesWithHoc = compose(withGraphQl);