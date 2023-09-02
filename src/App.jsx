import { useMutation, useQuery } from "@apollo/client";
import "@radix-ui/themes/styles.css";
import {
  Flex,
  Container,
  Text,
  ScrollArea,
  Card,
  Box,
  Em,
  Separator,
} from "@radix-ui/themes";
import { GET_TODOS } from "./graphql";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import "./style.css";

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
          <Text size="6" align="center">
            <Em>Ready, Set, Accomplish!</Em>
          </Text>
          <Box height="4" />
          <AddTodo />
          <Box height="4" />
          <Card>
            <ScrollArea
              type="scroll"
              scrollbars="vertical"
              style={{ height: 400 }}
            >
              {loading ? (
                <Flex direction="column" width="100%">
                  <Text align="center" style={{ color: "var(--olive-10)" }}>
                    <Em>loading</Em> your to-do list... ⌛
                  </Text>
                </Flex>
              ) : todos.length === 0 ? (
                <Flex direction="column" width="100%">
                  <Text align="center" style={{ color: "var(--olive-10)" }}>
                    your to-do list <Em>awaits</Em>... 📝
                  </Text>
                </Flex>
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
