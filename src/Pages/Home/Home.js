import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Container, Box, Grid } from "@mui/material";
import icon from "../../assets/filesharing-img.png";
import Navbar from "../../components/Navbar";
import { makeStyles } from "@mui/styles";
import image from "../../assets/img.jpg";
import "./Home.css";

const Home = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const useStyles = makeStyles({
    grid: {
        display:'flex',
        flexWrap: 'wrap'
    },
  });
  const classes = useStyles();
  return (
    <div className="main">
      <Navbar />
      <Container>
        <div className="row1">
          <div className="column c1">
            <div className="text1">
              Easy and secure access to all of your content
            </div>
            <br />
            <div className="text2">
              Store, share, and collaborate on files and folders from any mobile
              device, tablet, or computer
            </div>
          </div>
          <div className="column c2">
            <Box
              component="img"
              sx={{
                height: 350,
                width: 450,
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
              alt="Hello"
              src={icon}
            />
          </div>
        </div>
        <div className="row2">
          <div className="heading">Organized. Protected. Connected.</div>
          <div className="grid">
            <Grid container spacing={3} >
              <Grid item xs={4} className="grid">
                <Item>
                  <div className="subheading">Anywhere access</div>
                  <div className="contents">
                    Enjoy the freedom to access, edit, and share your files on
                    all your devices, wherever you are.
                  </div>
                </Item>
              </Grid>
              <Grid item xs={4} className="grid">
                <Item>
                  <div className="subheading">Back up and protect</div>
                  <div className="contents">
                    If you lose your device, you won’t lose your files and
                    photos when they’re saved in OneDrive.
                  </div>
                </Item>
              </Grid>
              <Grid item xs={4} className="grid">
                <Item>
                  <div className="subheading">Share and collaborate</div>
                  <div className="contents">
                    Stay connected, share your documents and photos with friends
                    and family, and collaborate in real time with Office apps.
                  </div>
                </Item>
              </Grid>
            </Grid>
          </div>
        </div>
        
        <div className="space" style={{paddingTop: '90px'}}></div>

        <div className="row1">
          <div className="column c2">
          <Box
              component="img"
              sx={{
                height: 350,
                width: 450,
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
              alt="Hello"
              src={image}
            />
          </div>
          <div className="column c1">
            <div className="text1">
            Share and collaborate
            </div>
            <br />
            <div className="text2">
            Share files, folders, and photos with friends and family. No more large email attachments or thumb drives—just send a link via email or text.
            </div>
          </div>
        </div>

        <div className="space" style={{paddingTop: '90px'}}></div>

        <div className="row4">
          <div className="heading">Features to make life easier and safer</div>
          <div className="grid">
            <Grid container spacing={3} className={classes.grid}>
              <Grid item xs={4} className="grid">
                <Item>
                  <div className="subheading">Files on demand</div>
                  <div className="contents">
                    Access all your OneDrive files in Windows 10 without taking
                    up space on your PC.
                  </div>
                </Item>
              </Grid>
              <Grid item xs={4}className="grid">
                <Item>
                  <div className="subheading">Document scanning</div>
                  <div className="contents">
                    Use your mobile device to scan and store documents,
                    receipts, business cards, notes, and more in OneDrive.
                  </div>
                </Item>
              </Grid>
              <Grid item xs={4} className="grid">
                <Item>
                  <div className="subheading">Personal Vault</div>
                  <div className="contents">
                    Store important files and photos with an added layer of
                    protection in OneDrive Personal Vault.
                  </div>
                </Item>
              </Grid>
            </Grid>
          </div>
        </div>
        
        <div className="space" style={{paddingTop: '100px'}}></div>
      </Container>
    </div>
  );
};

export default Home;
