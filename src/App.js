import { useMutation, useQuery } from "@apollo/client";
import "@radix-ui/themes/styles.css";
import { Flex, Container, Text, Checkbox, TextField } from "@radix-ui/themes";
import { GET_TODOS } from "./graphql";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (error) return <p>Error : {error.message}</p>;

  return (
    <Container size="1">
      <Flex direction="column" align="center" justify="center">
        <AddTodo />
        {loading ? (
          <Text>loading</Text>
        ) : (
          <Flex direction="column">
            {data.todosCollection.edges.map(({ node }) => (
              <TodoItem key={node._id} node={node} />
            ))}
          </Flex>
        )}
      </Flex>
    </Container>
  );
}

export default App;
