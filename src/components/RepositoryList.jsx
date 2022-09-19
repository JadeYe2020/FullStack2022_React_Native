import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
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
  listHeader: {
    padding: 12,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = (props) => {
  return (
    <View style={styles.listHeader}>
      <Searchbar
        placeholder="Search"
        onChangeText={props.onChangeSearch}
        value={props.searchQuery}
      />
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
    </View>
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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const [orderPrinciple, setOrderPrinciple] = useState("default");
  let variables = {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
    searchKeyword: debouncedQuery,
  };

  switch (orderPrinciple) {
    case "highestRated":
      variables = {
        ...variables,
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      };
      break;
    case "lowestRated":
      variables = {
        ...variables,
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };
      break;
    default:
      break;
  }
  const { repositories } = useRepositories(variables);

  const onChangeSearch = (query) => setSearchQuery(query);

  const containerProps = {
    orderPrinciple,
    setOrderPrinciple,
    repositories,
    onChangeSearch,
    searchQuery,
  };

  return <RepositoryListContainer {...containerProps} />;
};

export default RepositoryList;
