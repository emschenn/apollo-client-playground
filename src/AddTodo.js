import { useRef } from "react";
import { useMutation } from "@apollo/client";
import "@radix-ui/themes/styles.css";
import { Flex, Box, Text, TextField, Button } from "@radix-ui/themes";
import { GET_TODOS, ADD_TODO } from "./graphql";

function AddTodo() {
  const input = useRef();
  const [addTodo] = useMutation(ADD_TODO, {
    // refetchQueries: [{ query: GET_TODOS }],
    update(cache, { data }) {
      const newTodoFromResponse = data?.insertIntoTodosCollection.records[0];
      const existingTodos = cache.readQuery({
        query: GET_TODOS
      });

      if (existingTodos && newTodoFromResponse) {
        cache.writeQuery({
          query: GET_TODOS,
          data: {
            todos: [
              ...existingTodos?.todosCollection.edges,
              newTodoFromResponse
            ]
          }
        });
      }
    }
  });

  return (
    <Flex gap="2">
      <TextField.Root>
        <TextField.Input ref={input} placeholder="Enter here" />
      </TextField.Root>
      <Button
        onClick={() => {
          addTodo({
            variables: {
              todo: {
                description: input.current.value
              }
            }
          });
        }}
      >
        Add Todo 👉🏼
      </Button>
    </Flex>
  );
}

export default AddTodo;
