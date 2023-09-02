import { useMutation, useQuery } from "@apollo/client";
import "@radix-ui/themes/styles.css";
import {
  Flex,
  Container,
  Text,
  ScrollArea,
  Card,
  Box,
  Separator,
} from "@radix-ui/themes";
import { GET_TODOS } from "./graphql";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import "@radix-ui/themes/styles.css";

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (error) return <p>Error : {error.message}</p>;

  const todos = data?.todosCollection?.edges ?? [];

  console.log(todos);
  return (
    <Flex
      px="9"
      align="center"
      justify="center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Container size="1">
        <Flex direction="column">
          <AddTodo />
          <Box height="4" />
          <Card>
            <ScrollArea
              type="scroll"
              scrollbars="vertical"
              style={{ height: 400 }}
            >
              {loading ? (
                <Text>loading todos...</Text>
              ) : (
                <Flex direction="column" py="1" width="100%" gap="3">
                  {todos.map(({ node }, i) =>
                    i === todos.length - 1 ? (
                      <TodoItem key={node._id} node={node} />
                    ) : (
                      <>
                        <TodoItem key={node._id} node={node} />
                        <Separator size="4" />
                      </>
                    )
                  )}
                </Flex>
              )}
            </ScrollArea>
          </Card>
        </Flex>
      </Container>
    </Flex>
  );
}

export default App;
