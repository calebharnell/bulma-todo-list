import React from 'react';
import { Progress, Level, Heading, Title } from 'reactbulma'

const Header = ({ totalTasks, totalComplete, totalIncomplete, title }) => (
  <div>
    <Progress primary value={ totalComplete} max={ totalTasks }></Progress>
    <Level>
          <Level.Item hasTextCentered>
            <div>
              <Heading>Incomplete</Heading>
              <Title>{ totalIncomplete }</Title>
            </div>
          </Level.Item>
          <Level.Item hasTextCentered>
            <div>
              <Heading>Complete</Heading>
              <Title>{ totalComplete }</Title>
            </div>
          </Level.Item>
    </Level>
  </div>
)

export default Header;
