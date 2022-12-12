import { Card, Callout, List, ListItem, Title, Metric, Subtitle, Block, Text, Flex, Badge} from "@tremor/react";

const cities = [
  {
    city: "Remove duplicate files",
    rating: "2 open PR",
  },
  {
    city: "Luzern",
    rating: "1 open PR",
  },
  {
    city: "Zürich",
    rating: "0 open PR",
  },
  {
    city: "Vienna",
    rating: "1 open PR",
  },
  {
    city: "Ermatingen",
    rating: "0 open PR",
  },
  {
    city: "Lisbon",
    rating: "0 open PR",
  },
];

export default function Insights() {
  return (
    <Card>
      <Metric>Insights</Metric>
      <List>
        {cities.map((item) => (
          <ListItem key={item}>
            {/* <Block maxWidth="max-w-lg"> */}
            {/* <Text height="h-10">{item.city}</Text> */}
            {/* <p></p> */}
            {/* <Subtitle>{item.city}</Subtitle> */}
            {/* </Block> */}
            {/* <p>Potencial savings</p> */}

            {/* <Callout
        title="No critical system data"
        text="All systems are currently within their default operating ranges."
        
        height="h-4"
        color="teal"
        // marginTop="mt-4"
      /> */}

            {/* <p className="insightDesc">{item.city}</p> */}

            <Flex justifyContent="justify-start" alignItems="items-start" spaceX='space-x-2'>
              <Title>Reaper</Title>

              <Badge
                text="alpha"
                color="yellow"
                size="xs"
              />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Card>
  );


} 