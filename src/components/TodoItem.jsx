import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { Flex, Text, TextField, Checkbox, IconButton } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";

import { formatDateToCustomFormat } from "../utils";
import { EDIT_TODO, DELETE_TODO, GET_TODOS } from "../graphql";

function TodoItem({ node }) {
  const { id, __typename, ...todo } = node;
  const [isOnHover, setIsOnHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const inputRef = useRef(null);

  const [editTodo] = useMutation(EDIT_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const updateTodo = () => {
    setIsEditing(false);
    editTodo({
      variables: {
        todo: {
          ...todo,
          description,
        },
        todoId: id,
      },
    });
  };

  return (
    <Flex
      key={id}
      gap="2"
      justify="between"
      align="center"
      onMouseEnter={() => setIsOnHover(true)}
      onMouseLeave={() => setIsOnHover(false)}
    >
      <Flex direction="row" justify="center" align="center" gap="1">
        <Checkbox
          defaultChecked={todo.checked}
          color="teal"
          mr="1"
          size="2"
          onCheckedChange={(checked) =>
            editTodo({
              variables: {
                todo: {
                  ...todo,
                  checked,
                },
                todoId: id,
              },
            })
          }
        />
        {isEditing ? (
          <TextField.Input
            ref={inputRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => updateTodo()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTodo();
              }
            }}
          />
        ) : (
          <Flex
            onClick={() => setIsEditing(true)}
            direction="row"
            justify="center"
            align="center"
            gap="2"
          >
            {todo.description}
            <Text
              size="1"
              style={{
                color: "var(--olive-10)",
                opacity: isOnHover ? 1 : 0,
                transition: "opacity 150ms ease-in-out",
              }}
            >
              — Date added: {formatDateToCustomFormat(todo.created_at)}
            </Text>
          </Flex>
        )}
      </Flex>
      {isOnHover ? (
        <IconButton
          style={{ cursor: "pointer" }}
          variant="soft"
          size="1"
          onClick={() => {
            deleteTodo({
              variables: {
                todoId: id,
              },
            });
          }}
        >
          <Cross1Icon />
        </IconButton>
      ) : (
        <Cross1Icon style={{ padding: "4px" }} />
      )}
    </Flex>
  );
}

export default TodoItem;
