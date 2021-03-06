import { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Stack,
  TableRow,
  Paper,
  Typography,
  Button,
  tableCellClasses,
} from "@mui/material";
import { Link } from "react-router-dom";

export const AdminHome = () => {
  // State for saving User records to display
  // and to implement pagination in table
  const [userRecords, setUserRecords] = useState([]);
  const [bookRecords, setBookRecords] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/users/bytimestamp?page=1&limit=5`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setUserRecords(response.users);
      })
      .catch((error) => console.log(error));

    fetch(`http://localhost:4000/books/bytimestamp?page=1&limit=5`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setBookRecords(response.books);
      })
      .catch((error) => console.log(error));
  }, [searched]);

  // return the view
  return (
    <Container style={{ padding: "40px 0 70px 0" }}>
      <Grid container rowSpacing={5}>
        <Grid item xs={12}>
          <div
            style={{
              border: "2px solid #e5e5e5",
              padding: "25px",
              borderRadius: "5px",
            }}
          >
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                spacing={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">Recent Users</Typography>
                <Button
                  component={Link}
                  to="/admin/users"
                  variant="contained"
                  size="small"
                  style={{
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    backgroundColor: "#3f51b5",
                  }}
                >
                  View All
                </Button>
              </Stack>
              <Paper elevation={0}>
                <TableContainer>
                  <Table
                    size="small"
                    aria-label="a dense table"
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                      },
                    }}
                  >
                    <TableHead style={{ backgroundColor: "#8e99d7" }}>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userRecords.map((row, index) => (
                        <TableRow
                          key={row._id}
                          style={
                            index % 2
                              ? { background: "#EDEDEF" }
                              : { background: "white" }
                          }
                        >
                          <TableCell component="th" scope="row">
                            {row._id}
                          </TableCell>
                          <TableCell align="right">{row.username}</TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Stack>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div
            style={{
              border: "2px solid #e5e5e5",
              padding: "25px",
              borderRadius: "5px",
            }}
          >
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                spacing={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">Recent Books</Typography>
                <Button
                  component={Link}
                  to="/admin/books"
                  variant="contained"
                  size="small"
                  style={{
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    backgroundColor: "#3f51b5",
                  }}
                >
                  View All
                </Button>
              </Stack>
              <Paper elevation={0}>
                <TableContainer>
                  <Table
                    size="small"
                    aria-label="a dense table"
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                      },
                    }}
                  >
                    <TableHead style={{ backgroundColor: "#8e99d7" }}>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Author</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookRecords.map((row, index) => (
                        <TableRow
                          key={row._id}
                          style={
                            index % 2
                              ? { background: "#EDEDEF" }
                              : { background: "white" }
                          }
                        >
                          <TableCell component="th" scope="row">
                            {row._id}
                          </TableCell>
                          <TableCell align="right">{row.title}</TableCell>
                          <TableCell align="right">{row.author}</TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Stack>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
