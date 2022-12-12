import { Card, Callout, List, ListItem, Title, Metric, Subtitle, Block, Text, Flex, Badge, BadgeDelta, ButtonInline } from "@tremor/react";

import { InsightCardType } from "../interfaces";

const InsightsCard = ({ insights }: InsightCardType) => {
  console.log(insights)
  return (
    <Card>
      <Metric>Insights</Metric>
      <List>
        {insights.map((item) => (
          <ListItem key={item.insight}>
            <Flex justifyContent="justify-start" alignItems="items-start" spaceX='space-x-2'>
              <Title>{item.insight}</Title>
              <Subtitle>{item.detail}</Subtitle>
              <BadgeDelta
                deltaType="moderateIncrease"
                text={item.gain}
                isIncreasePositive={true}
                size="xs"
              />

              <ButtonInline text="→" handleClick={() => alert("Hire me")} />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
export default InsightsCard;