import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { PlusIcon } from "@radix-ui/react-icons";

import { Flex, IconButton, TextField } from "@radix-ui/themes";
import { GET_TODOS, ADD_TODO } from "../graphql";

function AddTodo() {
  const input = useRef();
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
    // update(cache, { data }) {
    //   const newTodoFromResponse = data?.insertIntoTodosCollection.records[0];
    //   const existingTodos = cache.readQuery({
    //     query: GET_TODOS
    //   });

    //   if (existingTodos && newTodoFromResponse) {
    //     cache.writeQuery({
    //       query: GET_TODOS,
    //       data: {
    //         todos: [
    //           ...existingTodos?.todosCollection.edges,
    //           newTodoFromResponse
    //         ]
    //       }
    //     });
    //   }
    // }
  });

  return (
    <Flex width="100%" gap="2" grow="1">
      <TextField.Root style={{ width: "100%" }} size="3">
        <TextField.Input ref={input} placeholder="Enter your task here..." />
      </TextField.Root>
      <IconButton
        size="3"
        style={{ cursor: "pointer" }}
        onClick={() => {
          addTodo({
            variables: {
              todo: {
                description: input.current.value,
              },
            },
          }).then(() => {
            input.current.value = "";
          });
        }}
      >
        <PlusIcon width="24" height="24" />
      </IconButton>
    </Flex>
  );
}

export default AddTodo;
