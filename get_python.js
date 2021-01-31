options = {
    scriptPath: path.join(__dirname, "./"),
    args: [JSON.stringify({ result }), JSON.stringify({ inputData })]
  };
  PythonShell.run("get_avg.py", options, function(err, data) {
    res.status(200).json({ data: JSON.parse(data), success: true });
  });

  console.log(data)