import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Icon,
  IconButton,
  Link as MatLink,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { take } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { newFileActions } from '../store/actions';
import { contentSelectors } from '../store/selectors';
import React from 'react';

export const Content: React.FC<{
  path: string;
  folderName: string | null;
  isRoot: boolean;
  backPath: string;
  splitPath: string[];
}> = ({ folderName, isRoot, path, backPath, splitPath }) => {
  const content = useSelector(contentSelectors.content);
  const dispatch = useDispatch();

  return (
    <>
      <AppBar color="primary" position="sticky">
        <Toolbar>
          {!isRoot && (
            <IconButton
              component={Link}
              to={backPath}
              aria-label="Back"
              color="inherit"
              sx={{ ml: -1.5, mr: 2 }}>
              <Icon>arrow_back</Icon>
            </IconButton>
          )}

          <Box flex="1 1 auto">
            <Typography variant="h6" noWrap component="div" flex="1 1 auto">
              {folderName || 'My Drive'}
            </Typography>

            <Breadcrumbs color="inherit">
              <Typography variant="body1" color="inherit">
                /drive/root:
              </Typography>
              {splitPath.map((seg, index) => (
                <MatLink
                  key={index}
                  component={Link}
                  color="inherit"
                  to={`/open/${take(index + 1, splitPath).join('/')}`}>
                  {seg}
                </MatLink>
              ))}
            </Breadcrumbs>
          </Box>
          <Button
            sx={{ ml: 2 }}
            color="inherit"
            onClick={() => dispatch(newFileActions.openDialog())}>
            New File
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {!!content.folders.length && (
          <Box>
            <Typography variant="overline" component="h2">
              Folders
            </Typography>
            <List>
              {content.folders.map((folder) => (
                <ListItem key={folder}>
                  <ListItemButton
                    component={Link}
                    to={`/open/${path ? path + '/' : ''}${encodeURIComponent(
                      folder,
                    )}`}>
                    <ListItemIcon>
                      <Icon>folder</Icon>
                    </ListItemIcon>
                    <ListItemText>{folder}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {!!content.files.length && (
          <Box>
            <Typography variant="overline" component="h2">
              Files
            </Typography>
            <List>
              {content.files.map((file) => (
                <ListItem key={file.id}>
                  <ListItemButton
                    component={Link}
                    to={`/edit/${encodeURIComponent(file.id)}`}>
                    <ListItemIcon>
                      <Icon>description</Icon>
                    </ListItemIcon>
                    <ListItemText>{file.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {!content.files.length && !content.folders.length && (
          <Box>
            <Typography variant="body1">Empty Folder</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
