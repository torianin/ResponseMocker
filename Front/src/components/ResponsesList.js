import React from "react";
import { connect } from "react-redux";
import { _ } from "lodash";
import Response from "./Response";
import { fetchResponses } from "../actions";
import MaterialTable from "material-table";

class ResponsesList extends React.Component {
  componentDidMount() {
    this.props.fetchResponses();
  }

  renderResponses() {
    const columns = [
      {
        title: "Path",
        field: "path",
        sorting: false,
        filtering: false,
        align: 'justify',
        render: (rowData) => (
          <Response className="w-100" key={rowData.id} id={rowData.id} />
        ),
      }, 
      {
        title: "Description",
        field: "description",
        searchable: true, 
        hidden: true,
      },
      {
        title: "Description",
        field: "isActive",
        searchable: true, 
        hidden: true,
        lookup: { true: 'Active', false: 'Disabled' }, 
      }
    ];

    return !this.props.responses.length ? (
      <div className="row p-3">
        <h3>No responses</h3>
      </div>
    ) : (
      <div className="py-4">
        <MaterialTable
          title="Responses"
          data={this.props.responses}
          columns={columns}
          options={{ search: true, paging: false, filtering: true, sorting: false, header: false, showTitle: false }}
          localization={{
            body: {
              emptyDataSourceMessage: "No responses to display",
            },
          }}
        />
      </div>
    );
  }

  render() {
    return <div>{this.renderResponses()}</div>;
  }
}

const mapStateToProps = (state) => {
  const responsesList = Object.values(state.responses);
  return {
    responses: _.orderBy(
      responsesList,
      [(response) => response.createdAt],
      ["desc"]
    ),
  };
};

export default connect(mapStateToProps, { fetchResponses })(ResponsesList);
