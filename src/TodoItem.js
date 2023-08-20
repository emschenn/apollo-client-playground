import { useMutation } from "@apollo/client";
import { Flex, Container, Text, Checkbox, TextField } from "@radix-ui/themes";
import { EDIT_TODO } from "./graphql";

function TodoItem({ node }) {
  const [updateTodo, { data, loading, error }] = useMutation(EDIT_TODO);

  return (
    <Flex key={node._id}>
      <Text size="2">
        <label>
          <Checkbox mr="1" /> {node.description}
        </label>
      </Text>
    </Flex>
  );
}

export default TodoItem;
