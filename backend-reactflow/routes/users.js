var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");

//
router.use(bodyParser.json());

const workflowData = [];

//save
router.post("/save-workflow", (req, res) => {
  const { nodes, edges, id } = req.body;
  console.log(req.body, "abbb");
  const workflow = { id, nodes, edges };
  workflowData.push(workflow);

  res.status(200).json({ succes: true, workflow });
});

/* GET workflow listing. */
router.get("/", function (req, res) {
  res.json(workflowData);
});
// get id
router.get("/:workflowId", function (req, res) {
  const workflowId = req.params.workflowId;
  console.log(workflowId, "iddd");
  const workflow = workflowData.find((workflow) => workflow.id === workflowId);

  res.json({ workflow });
});

module.exports = router;
