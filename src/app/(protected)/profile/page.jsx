"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { fetchUserProfile, updateProfile } from "../../redux/slice/userSlice";
import { logout } from "../../redux/slice/authSlice";
import { useRouter } from "next/navigation";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();

  const profile = useSelector((state) => state.user?.profile || {});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [mywatchList, setMywatchList] = useState([]);

  const handleProfileChange = async (event) => {
    dispatch(
      updateProfile({
        name,
        email,
      })
    );
    if (!event.target.files?.[0]) return;
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}user/updateAvatar`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (data?.profileAvatar) {
      setAvatar(data?.profileAvatar);
    }
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
    const watcherLater = JSON.parse(localStorage.getItem("myLists") ?? "[]");
    setMywatchList(watcherLater);
  }, [dispatch]);

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setName(profile?.name);
      setEmail(profile?.email);
      setAvatar(profile?.avatar);
    }
  }, [profile]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "black",
        color: "white",
      }}
    >
      <Container sx={{ flex: 1, py: 6 }}>
        <Typography variant="h4">Profile</Typography>

        {mywatchList && (
          <>
            <Typography variant="body2" color="grey.500">
              My List
            </Typography>
            <Paper sx={{ bgcolor: "grey.900", p: 4, mt: 4, borderRadius: 2 }}>
              <div className="my-list">
                {mywatchList &&
                  mywatchList?.map((ele, index) => (
                    <>
                      <div className="card" key={index}>
                        <div className="card-image-container">
                          <Image
                            src={ele?.posterUrl}
                            alt={ele?.title}
                            //   layout="fill"
                            width={300}
                            height={300}
                            objectFit="cover"
                            unoptimized
                          />
                          <h3 className="card-title">{ele?.title}</h3>
                        </div>
                        {/* <div className="card-content">
                       <p className="card-description">{description}</p>
                     </div> */}
                      </div>
                    </>
                  ))}
              </div>
            </Paper>
          </>
        )}

        <Paper sx={{ bgcolor: "grey.900", p: 4, mt: 4, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            Profile Settings
          </Typography>

          {/* ✅ Avatar Upload */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <Avatar sx={{ width: 64, height: 64 }} src={avatar} />
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadIcon />}
              sx={{ color: "white", borderColor: "white" }}
            >
              Upload Avatar
              <input type="file" accept="image/*" hidden />
            </Button>
          </Box>

          {/* ✅ Editable Username */}
          <Box mt={3}>
            <TextField
              label="Username"
              variant="filled"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                bgcolor: "grey.800",
                borderRadius: 1,
                input: { color: "white" },
                label: { color: "grey.500" },
              }}
            />
          </Box>

          {/* ✅ Email Selection */}
          <Box mt={3}>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              label="email"
              variant="filled"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                bgcolor: "grey.800",
                borderRadius: 1,
                input: { color: "white" },
                label: { color: "grey.500" },
              }}
            />
          </Box>

          {/* ✅ Save Button */}
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 4 }}
            onClick={handleProfileChange}
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 4, ml: 4, backgroundColor: "grey", color: "white" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
