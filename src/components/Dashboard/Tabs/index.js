import React, {useState, useRef, useEffect} from 'react';
import {Box, createTheme, ThemeProvider} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '../Grid';
import List from '../List';
import { FixedSizeList } from 'react-window';
import "./styles.css";

export default function TabsComponent({coins}) {
  const [value, setValue] = useState('grid');
  const [containerHeight, setContainerHeight] = useState(window.innerHeight - 200);
  const listRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(window.innerHeight - 200);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleKeyDown = (event) => {
    const isGridView = value === 'grid';
    if (event.key === 'ArrowRight') {
      setValue('list');
    } else if (event.key === 'ArrowLeft') {
      setValue('grid');
    }
  };

  const style = {
    color: "var(--white)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });

  const Row = ({ index, style }) => (
    <div style={style}>
      <List coin={coins[index]} />
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} role="navigation">
          <TabList 
            onChange={handleChange} 
            variant='fullWidth'
            onKeyDown={handleKeyDown}
            aria-label="Cryptocurrency view options"
          >
            <Tab 
              label="Grid" 
              value="grid" 
              sx={style}
              aria-controls="grid-tabpanel"
              aria-selected={value === 'grid'}
            />
            <Tab 
              label="List" 
              value="list" 
              sx={style}
              aria-controls="list-tabpanel"
              aria-selected={value === 'list'}
            />
          </TabList>
        </Box>
        <TabPanel 
          value="grid" 
          id="grid-tabpanel"
          role="tabpanel"
          aria-labelledby="grid-tab"
        >
          <div className='grid-flex' role="grid">
            {coins.map((coin,i) => (
              <Grid coin={coin} key={i}/>
            ))}
          </div>
        </TabPanel>
        <TabPanel 
          value="list" 
          id="list-tabpanel"
          role="tabpanel"
          aria-labelledby="list-tab"
          style={{ padding: 0 }}
        >
          <div className='list-table' role="table" aria-label="Cryptocurrency list">
            {coins.length > 0 && (
              <FixedSizeList
                ref={listRef}
                height={containerHeight}
                width="100%"
                itemSize={80}
                itemCount={coins.length}
                overscanCount={5}
              >
                {Row}
              </FixedSizeList>
            )}
          </div>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}