import {observer} from "mobx-react";
import { useStore } from "../../stores/RootStore";
import {CircularLoading} from "../../utils/components/CircularLoading";
import {Page} from "../../utils/styles/pageStyles";
import ServicesStack from "../../utils/components/service/ServicesStack";
import {Title} from "../../utils/components/Title";
import styled from "@emotion/styled";

/**
 * Page displaying search results
 * @returns {JSX.Element}
 * @constructor
 */
const SearchPage = () => {

  const {serviceStore} = useStore();

  let services = serviceStore.getServices();

  if (services === undefined) {
    return (<CircularLoading />)
  }

  return (
    <Page>
      <Title text="Search Results"/>
      <ResultsContainer>
        {services.length > 0
          ? <ServicesStack services={services} />
          : <div>No results match the search. Please try again</div>
        }
      </ResultsContainer>
    </Page>
  )
}

export default observer(SearchPage);

const ResultsContainer = styled.div`
  margin-top: 10px;
`