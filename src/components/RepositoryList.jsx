import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 100,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = (props) => {
  return (
    <Picker
      selectedValue={props.orderPrinciple}
      onValueChange={(itemValue, itemIndex) =>
        props.setOrderPrinciple(itemValue)
      }
    >
      <Picker.Item label="Latest repositories" value="default" />
      <Picker.Item label="Highest rated repositories" value="highestRated" />
      <Picker.Item label="Lowest rated repositories" value="lowestRated" />
    </Picker>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;

    return <RepositoryListHeader {...props} />;
  };

  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <View style={styles.flexContainer}>
        <FlatList
          data={repositoryNodes}
          ListHeaderComponent={this.renderHeader}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <RepositoryItem item={item} isSingleView={false} />
          )}
        />
      </View>
    );
  }
}

const RepositoryList = () => {
  const [orderPrinciple, setOrderPrinciple] = useState("default");
  let variables = {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  };

  switch (orderPrinciple) {
    case "highestRated":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      };
      break;
    case "lowestRated":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };
      break;
    default:
      break;
  }
  const { repositories } = useRepositories(variables);

  const containerProps = { orderPrinciple, setOrderPrinciple, repositories };

  return <RepositoryListContainer {...containerProps} />;
};

export default RepositoryList;
