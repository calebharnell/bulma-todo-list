import React from 'react';
import { Progress, Level, Heading, Title } from 'reactbulma'

const Header = ({ totalComplete, totalIncomplete, title }) => (
  <div>
    <Progress primary value="30" max="100">30%</Progress>
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
