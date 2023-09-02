import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  {
    todosCollection {
      edges {
        node {
          id
          description
          checked
          created_at
        }
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation ($todo: TodosInsertInput!) {
    insertIntoTodosCollection(objects: [$todo]) {
      affectedCount
      records {
        id
        description
        checked
        created_at
      }
    }
  }
`;

export const EDIT_TODO = gql`
  mutation ($todo: TodosUpdateInput!, $todoId: BigInt) {
    updateTodosCollection(set: $todo, filter: { id: { eq: $todoId } }) {
      affectedCount
      records {
        id
        description
        checked
        created_at
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation ($todoId: BigInt) {
    deleteFromTodosCollection(filter: { id: { eq: $todoId } }) {
      affectedCount
      records {
        id
        description
        checked
        created_at
      }
    }
  }
`;
