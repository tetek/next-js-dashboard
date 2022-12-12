import { Card, Metric, DonutChart, BadgeDelta, Flex, Footer, Button } from "@tremor/react"
export default function SizeCard({size}) {
  
const valueFormatter = (number: number) => (
    `${number.toString()}MB`
);
  return (
  <Card maxWidth="max-w-lg">

<Flex justifyContent="justify-between" alignItems="items-center">
<Metric>App Size</Metric>
        {/* <BadgeDelta
        deltaType="moderateIncrease"
        text="+12.3%"
        isIncreasePositive={true}
        size="xs"
      /> */}
    </Flex>
        
        <DonutChart
            data={ size }
            category="size"
            dataKey="name"
            valueFormatter={ valueFormatter }
            marginTop="mt-6"
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
        />
        <Footer height="h-16">
      <Flex justifyContent="justify-end">
        <Button text="X-Ray" size="xs" importance="secondary" handleClick={() => alert("Hire me")}/>
      </Flex>
    </Footer>
    </Card>
  )
}
