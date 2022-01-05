import { Meta } from "@storybook/react";
import { GameItem } from "../../../../components/molecules";
import { GameItemProps } from "../../../../components/molecules/GameItem";

export default {
  title: "Components/Molecules/GameItem",
  component: GameItem,
} as Meta;

const Template = (args: GameItemProps) => <GameItem {...args} />

export const Default = Template.bind({})

Default.args = {
    title: 'Super Mechs',
    category: 'Mobile',
    thumbnail: "Thumbnail-1"
}
