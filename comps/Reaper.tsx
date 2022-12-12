import { Text, ButtonInline, Card, List, ListItem, Metric, Badge, Flex } from "@tremor/react";

const cities = [
  {
    city: "MyManager:getPrices",
    rating: "2 open PR",
  },
  {
    city: "MyManager:countItems",
    rating: "1 open PR",
  }
];

export default function Reaper() {
  return (
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
        {cities.map((item) => (
          <ListItem key={item}>
            <span>{item.city}</span>
            <ButtonInline text="→" handleClick={() => alert("Hire me")}/>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

