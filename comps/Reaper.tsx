import { Text, ButtonInline, Card, List, ListItem, Metric, Badge, Flex } from "@tremor/react";

const code = [
  {
    place: "MyManager:getPrices",
  },
  {
    place: "MyManager:countItems",
  }
];
const Reaper = () => (
  <Card>
    <Flex justifyContent="justify-start" alignItems="items-start" spaceX='space-x-2'>
      <Metric>Reaper</Metric>

      <Badge
        text="alpha"
        color="yellow"
        size="xs"
      />
    </Flex>
    {/* <Metric>Reaper</Metric> */}
    <Text>Dead code analysis</Text>
    <List marginTop="mt-3">
      {code.map((item) => (
        <ListItem key={item.place}>
          <span>{item.place}</span>
          <ButtonInline text="→" handleClick={() => alert("Hire me")} />
        </ListItem>
      ))}
    </List>
  </Card>
)
export default Reaper;

