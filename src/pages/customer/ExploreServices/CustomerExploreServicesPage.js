import {observer} from "mobx-react";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import {Page} from "../../../utils/styles/pageStyles";
import React, {useState} from "react";
import {useStore} from "../../../stores/RootStore";
import ServicesStack from "../../../utils/components/service/ServicesStack";
import ServiceCategorySelect from "../../../utils/components/service/ServiceCategorySelect";
import styled from "@emotion/styled";
import IconButton from "../../../utils/components/IconButton";
import {faFilterCircleXmark} from "@fortawesome/free-solid-svg-icons";

/**
 * List of all available services
 * @returns {JSX.Element}
 * @constructor
 */
const CustomerExploreServicesPage = () => {

  const { serviceStore } = useStore();

  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    try{
      setCategory(event.target.value)
      serviceStore.requestServices(null, event.target.value)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClear = () => {
    try{
      setCategory("Category")
      serviceStore.requestServices()
    } catch (err) {
      console.log(err)
    }
  }

  const services = serviceStore.getServices(null);

  // Loading
  if (services === undefined) {
    return (
      <CircularLoading />
    )
  }

  return (
    <Page>
      <FilterContainer>
        <Container>
          <IconButton
            icon={faFilterCircleXmark}
            name="Clear Filter"
            onClick={handleClear}
            color="primary"
          />
          <ServiceCategorySelect
            id="category"
            value={category}
            onChange={handleChange}
            filter
            required
          />
        </Container>

      </FilterContainer>
      <ServicesStack services={services} perspective="customer"/>
    </Page>
  )
}

export default observer(CustomerExploreServicesPage);

const FilterContainer = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 20px 20px 20px;
`

const Container = styled.div`
  display: flex;
  width: 40%;
  gap: 10px;
`