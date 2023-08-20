import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  {
    todosCollection {
      edges {
        node {
          id
          description
        }
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation($todo: TodosInsertInput!) {
    insertIntoTodosCollection(objects: [$todo]) {
      affectedCount
      records {
        id
        description
      }
    }
  }
`;

export const EDIT_TODO = gql`
  mutation($todo: TodosInsertInput!) {
    updateTodosCollection(set: $todo) {
      affectedCount
      records {
        id
        description
      }
    }
  }
`;
