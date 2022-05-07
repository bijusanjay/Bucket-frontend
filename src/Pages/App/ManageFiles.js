import { Container, Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";
import { useHistory } from "react-router-dom";
import logger from "logging-library";
import FileViewer from "react-file-viewer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { makeStyles } from "@mui/styles";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import Modal from "@mui/material/Modal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UpdateIcon from "@mui/icons-material/Update";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Navbar from "../../components/Navbar"

const ManageFiles = () => {
  const history = useHistory();
  const [fileId, setFileId] = useState(null);
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [newName, setNewName] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [shareId, setshareId] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedRoleToUpdate, setSelectedRoleToUpdate] = useState(null);
  const [arrayBuffer, setArrayBuffer] = useState(null);
  const [config, setConfig] = useState(null);
  const [fileData, setFileData] = useState("");
  const [fileName, setFileName] = useState("");
  const [contentType, setContentType] = useState("");
  const [fileDetails, setFileDetails] = useState([]);
  const [role, setRole] = useState(null);
  const [accesslist, setAccesslist] = useState([]);
  const [open, setOpen] = useState(false);
  const search = useParams();

  const useStyles = makeStyles({
    file: {
      height: "100px !important",
    },
    avatar: {
      cursor: "pointer",
      display: "flex",
      color: "white !important",
      backgroundColor: "darkslateblue !important",
    },
    navbar: {
      background: "darkslateblue",
    },
    icons: {
      display: "flex !important",
      justifyContent: "space-between !important",
    },
    fname: {
      textAlign: "left !important",
      display: "flex",
      justifyContent: "left"
    },
    select: {
      display: "flex !important",
      justifyContent: "space-evenly",
      paddingTop: "15px",
      width: "200px",
      marginTop: "-7px"
    },
    fName: {
      fontWeight: "500",
      color: "darkslateblue"
    },
    title: {
      display: "flex",
      justifyContent: "center",
      marginLeft: "-25px",
    },
    addperson: {
      marginTop: "8px",
    },
    text: {
      marginLeft: "10px",
    },
    fileaccess: {
      display: "flex",
      justifyContent: "space-evenly !important",
      width: "100%",
      alignItems: "center",
    },
    people: {
      paddingTop: "0 !important",
      paddingBottom: "0 !important",
      border: "1px solid #ccc",
      display: "flex",
      padding: "20px",
      borderRadius: "4px",
    },
    users: {
      paddingBottom: "8px",
    },
    ol: {
      paddingLeft: "0px"
    },
    owner: {
      color: "gray",
      fontStyle: "italic"
    }, 
    selectContainer: {
      display: "flex",
      justifyContent: "space-between"
    },
    share: {
      marginTop: "5px"
    },
    columnTitle: {
      fontSize: "1.3rem",
      fontWeight: "500"
    }
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    loadInit()
  }, []);

  useEffect(() => {
    if (config && fileId) {
      getFile();
      getFileDetails();
      getRoleOfFile();
      getAccessList();
    }
  }, [config]);

  const loadInit = ()=>{
    let fid = new URLSearchParams(search).get("fileId");
    let authToken = reactLocalStorage.get("authToken");

    const arrayBufferConfig = {
      headers: { Authorization: `Bearer ${authToken}` },
      responseType: "arraybuffer",
    };

    const configuration = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    console.log({ fid });
    setFileId(fid);
    setArrayBuffer(arrayBufferConfig);
    setConfig(configuration);
  }

  // file rename prompt open/close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getFile = () => {
    axios
      .get(
        `https://murmuring-mountain-24156.herokuapp.com/file/${fileId}`,
        arrayBuffer
      )
      .then((response) => {
        console.log(response);
        console.log(response.headers["content-type"]);
        console.log({ Buffer });
        let base64ImageString = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        let srcValue =
          `data:${response.headers["content-type"]};base64,` +
          base64ImageString;

        setFileData(srcValue);
        setIsFileLoaded(true);
        setFileName(response.headers["content-disposition"]);
        setContentType(response.headers["content-type"]);
      })
      .catch((err) => {
        console.log(err);
        // alert(err.status + err.response)
      });
  };

  const getFileDetails = () => {
    axios
      .get(
        `https://murmuring-mountain-24156.herokuapp.com/file/${fileId}/details`,
        config
      )
      .then((response) => {
        setFileDetails(response.data);
        console.log(fileDetails);
        let fileExtension = response.data.filename;
        let a = fileExtension.split(".");
        setFileExtension(a[1]);
        console.log(a[1]);
      })
      .catch((err) => {
        console.log(err);
        // alert(err.status + err.response)
      });
  };

  const getRoleOfFile = () => {
    axios
      .get(
        `https://murmuring-mountain-24156.herokuapp.com/file/${fileId}/role`,
        config
      )
      .then((response) => {
        console.log(response);
        setRole(response.data.role);
      })
      .catch((err) => {
        console.log(err);
        // alert(err.status + err.response)
      });
  };

  const getAccessList = () => {
    axios
      .get(
        `https://murmuring-mountain-24156.herokuapp.com/file/${fileId}/users`,
        config
      )
      .then((response) => {
        console.log(response);
        setAccesslist(response.data);
      })
      .catch((err) => {
        console.log(err);
        // alert(JSON.stringify(err.response));
      });
  };

  const download = () => {
    let a = document.createElement("a");
    a.href = fileData;
    a.download = fileDetails.filename;
    a.click();
    console.log(fileName);
  };

  const getFileRename = (e) => {
    setFileName(e.currentTarget.value);
  };

  const handleRename = () => {
    axios
      .put(
        `https://murmuring-mountain-24156.herokuapp.com/file/${fileId}/rename`,
        {
          newFileName: fileName,
        },
        config
      )
      .then((response) => {
        setOpen(false);
        setFileDetails({
          fileDetails: {
            ...fileDetails,
            filename: fileName,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        alert(JSON.stringify(err.response));
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://murmuring-mountain-24156.herokuapp.com/file/${fileId}`,
        config
      )
      .then((response) => {
        history.push("/file");
      })
      .catch((err) => {
        console.log(err);
        // alert(err.status + err.response)
      });
  };

  const loadOptions = (inputValue, callback) => {
    axios
      .get(
        `https://murmuring-mountain-24156.herokuapp.com/getUsers?searchString=${inputValue}`,
        config
      )
      .then((response) => {
        callback(
          response.data.map((row) => ({
            label: row.email,
            value: row,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
        callback([]);
      });
  };

  const handleInputChange = (newValue) => {
    return newValue;
  };

  const handleShareOptionSelect = (selectedOption) => {
    setshareId(selectedOption);
  };

  const handleShare = () => {
    if (selectedRole && shareId) {
      let body = {
        destinationEmail: shareId.label,
        fileID: fileId,
        role: selectedRole.value,
      };
      axios
        .post(
          "https://murmuring-mountain-24156.herokuapp.com" + "/file/share",
          body,
          config
        )
        .then((response) => {
          setSelectedRole()
          getAccessList()
          alert(response.data.msg);
        })
        .catch((err) => {
          console.log(err);
          alert(JSON.stringify(err.response));
        });
    }
  };

  const handleRoleSelect = (value) => {
    setSelectedRole(value);
  };

  const handleRoleUpdateSelect = (value) => {
    setSelectedRoleToUpdate(value);
  };

  const handleUpdateRole = (email) => {
    let body = {
      destinationEmail: email,
      fileID: fileId,
      role: selectedRoleToUpdate.value,
    };
    axios
      .post(
        "https://murmuring-mountain-24156.herokuapp.com" + "/file/share",
        body,
        config
      )
      .then((response) => {
        alert(response.data.msg);
        getAccessList();
        // window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        alert(JSON.stringify(err.response));
      });
  };

  const handleRemoveAccess = (email) => {
    // console.log(body, this.state.config);
    axios
      .delete(
        `https://murmuring-mountain-24156.herokuapp.com/file/${fileId}/access`,
        {
          data: { email: email },
          headers: {
            Authorization: `Bearer ${reactLocalStorage.get("authToken")}`,
          },
        }
      )
      .then((response) => {
        alert(response.data.msg);
        getAccessList();
      })
      .catch((err) => {
        console.log(err);
        alert(JSON.stringify(err.response));
      });
  };
  const classes = useStyles();

  const handleopen = () => setOpen(true);
  const handleclose = () => setOpen(false);

  return (
    <div className="main">
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={classes.navbar}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DRIVE
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <div className="row1">
          <div className="column c2">
            <p className={classes.columnTitle}>File preview</p>
            {isFileLoaded && (
              <embed src={fileData} width={450} height={450}></embed>
            )}
            <div>
              <div className="row1">
                <div className="column c2">
                  <p className={classes.fName}>{fileDetails.filename}</p>
                </div>
                <div className="column c2 temp">
                  <div className={classes.icons}>
                    <Avatar className={classes.avatar}>
                      <DriveFileRenameOutlineOutlinedIcon
                        onClick={handleClickOpen}
                      />
                    </Avatar>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Rename file</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="File name"
                          type="text"
                          fullWidth
                          variant="standard"
                          onChange={getFileRename}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleRename}>Rename</Button>
                      </DialogActions>
                    </Dialog>

                    <Avatar className={classes.avatar}>
                      <DeleteOutlinedIcon onClick={handleDelete} />
                    </Avatar>

                    <Avatar className={classes.avatar}>
                      <FileDownloadOutlinedIcon onClick={download} />
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isFileLoaded ? (
            <div className="column c2">
              <div className={classes.share}>
                <div className={classes.title}>
                  <p className={`${classes.text} ${classes.columnTitle}`}>Share with people and groups</p>
                </div>

                <div className={classes.selectContainer}>
                <Avatar className={`${classes.avatar} ${classes.addperson}`}>
                    <PersonAddIcon />
                  </Avatar>
                <div className={classes.select}>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    onInputChange={handleInputChange}
                    onChange={handleShareOptionSelect}
                    selectedOption={shareId}
                    isClearable
                    placeholder="Select an email id"
                  />
                </div>
                <div className={classes.select}>
                  <Select
                    isClearable={false}
                    options={[
                      { label: "Owner", value: "Owner" },
                      { label: "Editor", value: "Editor" },
                      { label: "Viewer", value: "Viewer" },
                    ]}
                    onChange={handleRoleSelect}
                    placeholder="Select a role"
                  />
                </div>
                <Avatar className={`${classes.avatar} ${classes.share}`}>
                    <SendIcon onClick={handleShare} />
                  </Avatar>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div>
                  {/* <p>{accesslist.length} user(s) have access to this file</p> */}
                  <ol className={classes.ol}>
                    {accesslist.map((user) => (
                      <div className={classes.users}>
                        <li className={classes.people}>
                          <div className={classes.fileaccess}>
                            <div className={classes.title1}>
                              <p>{user.email}</p>
                            </div>
                            {user.role == "Owner" ? (
                              <div title="disabled" className={classes.owner}>Owner</div>
                            ) : (
                              <>
                                <Select
                                  isClearable={false}
                                  options={[
                                    { label: "Owner", value: "Owner" },
                                    { label: "Editor", value: "Editor" },
                                    { label: "Viewer", value: "Viewer" },
                                  ]}
                                  onChange={handleRoleUpdateSelect}
                                  placeholder={user.role}
                                  selectedOption={{
                                    label: user.role,
                                    value: user.role
                                  }}
                                />
                                <Avatar className={classes.avatar}>
                                  <UpdateIcon
                                    onClick={() => handleUpdateRole(user.email)}
                                  />
                                </Avatar>
                                <Avatar className={classes.avatar}>
                                  <PersonRemoveIcon
                                    onClick={() =>
                                      handleRemoveAccess(user.email)
                                    }
                                  />
                                </Avatar>
                              </>
                            )}
                          </div>
                        </li>
                      </div>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default ManageFiles;
