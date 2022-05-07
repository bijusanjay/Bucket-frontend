import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import pdf from "../../assets/file.jpg";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles({
  navbar: {
    background: "darkslateblue",
  },
  logout: {
    color: "white",
    fontSize: "1rem",
    textDecoration: "None",
    display: "flex",
    marginLeft: "90%",
  },
  uploadbtn: {
    borderRadius: "24px !important",
    backgroundColor: "white !important",
    color: "black !important",
    border: "1px solid transparent !important",
    boxShadow:
      "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%) !important",
    display: "flex !important",
    height: "48px !important",
    letterSpacing: ".15px !important",
    lineHeight: "22px !important",
    margin: "0 !important",
    minWidth: "120px !important",
    padding: "0 24px 0 0 !important",
    width: "inherit !important",
    textAlign: "center !important",
    alignItems: "center !important",
    justifyContent: "center!important",
    marginLeft: "33px !important",
  },
  submit: {
    marginTop: "15px !important",
    marginLeft: "46px !important",
    color: "#483D8B",
    borderColor: "#483D8B"
  },
  fileName: {
    fontSize: "1rem !important",
  },
  link: {
    textDecoration: "none"
  }
});

const ListFiles = () => {
  const [file, SetFile] = useState(null);
  const [config, SetConfig] = useState(null);
  const [carddata, SetCarddata] = useState([]);
  const drawerWidth = 240;

  useEffect(() => {
    let authToken = reactLocalStorage.get("authToken");
    const configuration = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    SetConfig(configuration);
  }, []);

  useEffect(() => {
    getAllFiles();
  }, [config]);

  const getAllFiles = () => {
    if (config !== null) {
      console.log(config);
      axios.get(
          "https://murmuring-mountain-24156.herokuapp.com" + "/files",
          config
        )
        .then((response) => {
          console.log(response);
          SetCarddata(response.data);
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.status + err.response);
        });
    }
  };

  const Input = styled("input")({
    display: "none",
  });

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    SetFile(formData);
  };

  const fileUpload = async (e) => {
    e.preventDefault();
    axios
      .post(
        "https://murmuring-mountain-24156.herokuapp.com" + "/file/upload",
        file,
        config
      )
      .then((res) => {
        alert("Uploaded File successfully!");
        getAllFiles();
      })
      .catch((err) => {
        alert(JSON.stringify(err.response));
        console.log(err.response);
      });
  };


  const classes = useStyles();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: 0,
          },
        }}
      >
        <Toolbar />
        <Box onSubmit={fileUpload} component="form" sx={{ overflow: "auto" }}>
          <List>
            <ListItem>
              <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="contained-button-file">
                  <Input
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={onFileChange}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    className={classes.uploadbtn}
                  >
                    {/* <div className={classes.new}> */}
                    <AddIcon />New
                    {/* </div> */}
                  </Button>
                  <Button
                    variant="outlined"
                    type="submit"
                    className={classes.submit}
                  >
                    UPLOAD
                  </Button>
                </label>
              </Stack>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>{/* {carddata} */}</Typography>
          <div className="row">
            {carddata.map((obj, index) => {
              let fileExt = obj?.filename?.split(".");
              return (
                  <div className="col">
                    <Link to={location => `/file/${obj._id}` } target="_blank" className={classes.link}>
                    <Card sx={{ maxWidth: 345 }} className="card">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`https://ui-avatars.com/api/?length=4&size=1024&font-size=0.2&color=fafafa&background=483D8B&name=${fileExt?.[fileExt.length-1]??"null"}`}
                          // alt="green iguana"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className={classes.fileName}
                          >
                            {obj.filename}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className={classes.date}
                          >
                            {new Date(obj.uploadDate).toLocaleString()}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    </Link>
                  </div>
            );
          })}
        </div>
        {/* </Toolbar> */}
      </Box>
    </Box>
  );
};

export default ListFiles;