import { useMutation } from "@apollo/client";
import { Flex, Separator, Text, Checkbox, TextField } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";

import { EDIT_TODO } from "../graphql";

function TodoItem({ node }) {
  const [updateTodo, { data, loading, error }] = useMutation(EDIT_TODO);

  return (
    <Flex key={node._id} gap="2" justify="between" align="center">
      <Text size="2">
        <label>
          <Checkbox
            defaultChecked={node.checked}
            color="teal"
            mr="1"
            size="2"
          />{" "}
          {node.description}
        </label>
      </Text>
      <Cross1Icon />
    </Flex>
  );
}

export default TodoItem;
