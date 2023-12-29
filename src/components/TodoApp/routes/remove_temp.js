import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Todolist";
import Notes from "../pages/AddNotes";

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default Routes;
