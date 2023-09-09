import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (newGoalName) => {
    console.log("adding new goal=", newGoalName);
    setCourseGoals((courseGoals) => [
      ...courseGoals,
      { id: Math.random().toString(), value: newGoalName },
    ]);
    setIsAddMode(false);
  };

  const deleteHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter(goal => goal.id !== goalId)
    });
  }

  const cancelHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title='Add New Goal' onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} addGoal={addGoalHandler} onCancel={cancelHandler}/>
      <FlatList
        data={courseGoals}
        keyExtractor={(item, index) => item.id}
        renderItem={(itemData) => (
          <GoalItem
            onDelete={deleteHandler}
            value={itemData.item.value}
            id={itemData.item.id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
