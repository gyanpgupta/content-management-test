import React from 'react';

import Header from './containers/Header';
import ProjectInformation from './containers/ProjectInformation';
import { Row } from './styledComponents/projectStyled';

const App = () => (
  <Row>
    <Header />
    <ProjectInformation />
  </Row>
);

export default App;
