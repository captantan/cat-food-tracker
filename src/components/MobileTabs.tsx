import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  idBase: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, idBase, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${idBase}-tabpanel-${index}`}
      aria-labelledby={`${idBase}-tab-${index}`}
      {...other}>
      {children}
    </div>
  );
}

function a11yProps(idBase: string, index: number) {
  return {
    id: `${idBase}-tab-${index}`,
    'aria-controls': `${idBase}-tabpanel-${index}`,
  };
}

export const MobileTabs: React.FC<{
  children: Array<{
    title: string;
    key: string;
    content: React.ReactNode;
    disabled: boolean;
  }>;
}> = ({ children }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const id = React.useId();

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Nav Tabs"
          variant="fullWidth">
          {children.map((tab, i) => (
            <Tab
              key={i}
              label={tab.title}
              {...a11yProps(id, i)}
              disabled={tab.disabled}
            />
          ))}
        </Tabs>
      </Box>
      {children.map((tab, i) => (
        <TabPanel key={i} value={value} index={i} idBase={id}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};
