import { StackNavigator } from "react-navigation";
import * as Pages from "todoList/src/pages";

export default StackNavigator(
  {
    home: {
      screen: Pages.Home
    },
    detailsTodo: {
      screen: Pages.DetailsTodo
    }
  },
  {
    initialRouteName: "home",
    headerMode: "none"
  }
);
