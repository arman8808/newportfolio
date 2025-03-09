"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function Page() {
  const [repos, setRepos] = useState([]);
  const [modalData, setModalData] = useState({ type: "", repo: null });
  const [issueDetails, setIssueDetails] = useState({ title: "", body: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch repositories
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const { data } = await axios.get(API_BASE_URL);
        console.log(data, "data");

        setRepos(data ? data : []);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepos();
  }, []);

  const openModal = (type, repo = null) => {
    setModalData({ type, repo });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({ type: "", repo: null });
    setIssueDetails({ title: "", body: "" });
  };

  const createIssue = async () => {
    if (!issueDetails.title.trim()) {
      alert("Issue title is required.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/${modalData.repo.name}/issues`,
        issueDetails
      );

      closeModal();
      alert(`Issue created successfully: ${data.issue_url}`);
    } catch (error) {
      alert("Failed to create the issue.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        GitHub Repositories
      </Typography>
      <div className=" flex items-center justfiy-center gap-2 my-2">
        <p className="text-lg">
          <strong>Followers:</strong> {repos?.followers}
        </p>
        <p className="text-lg">
          <strong>Following:</strong> {repos?.following}
        </p>
      </div>
      <Grid container spacing={3}>
        {repos?.repositories?.map((repo) => (
          <Grid item xs={12} sm={6} md={4} key={repo.id}>
            <RepoCard repo={repo} openModal={openModal} />
          </Grid>
        ))}
      </Grid>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {modalData.type === "repo" && modalData.repo && (
            <RepoDetails repo={modalData.repo} closeModal={closeModal} />
          )}

          {modalData.type === "issue" && modalData.repo && (
            <CreateIssueForm
              repoName={modalData.repo.name}
              issueDetails={issueDetails}
              setIssueDetails={setIssueDetails}
              createIssue={createIssue}
              closeModal={closeModal}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default Page;

const RepoCard = ({ repo, openModal }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{repo.name}</Typography>
      <Typography variant="body2" color="textSecondary">
        {repo.description || "No description available"}
      </Typography>
      <Button variant="outlined" onClick={() => openModal("repo", repo)}>
        View Details
      </Button>
      <Button variant="outlined" onClick={() => openModal("issue", repo)}>
        Create Issue
      </Button>
    </CardContent>
  </Card>
);

const RepoDetails = ({ repo, closeModal }) => (
  <>
    <Typography variant="h6" gutterBottom>
      {repo.name}
    </Typography>
    <Typography variant="body2" gutterBottom>
      {repo.description || "No description available"}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Stars: {repo.stargazers_count}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Forks: {repo.forks_count}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Language: {repo.language}
    </Typography>
    <Button variant="outlined" sx={{ mt: 2 }} onClick={closeModal}>
      Close
    </Button>
  </>
);

const CreateIssueForm = ({
  repoName,
  issueDetails,
  setIssueDetails,
  createIssue,
  closeModal,
}) => (
  <>
    <Typography variant="h6" gutterBottom>
      Create Issue for {repoName}
    </Typography>
    <TextField
      label="Issue Title"
      fullWidth
      sx={{ mt: 2 }}
      value={issueDetails.title}
      onChange={(e) =>
        setIssueDetails((prev) => ({ ...prev, title: e.target.value }))
      }
    />
    <TextField
      label="Issue Body"
      fullWidth
      multiline
      rows={4}
      sx={{ mt: 2 }}
      value={issueDetails.body}
      onChange={(e) =>
        setIssueDetails((prev) => ({ ...prev, body: e.target.value }))
      }
    />
    <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
      <Button variant="outlined" onClick={createIssue}>
        Submit
      </Button>
      <Button variant="outlined" onClick={closeModal}>
        Cancel
      </Button>
    </Box>
  </>
);
