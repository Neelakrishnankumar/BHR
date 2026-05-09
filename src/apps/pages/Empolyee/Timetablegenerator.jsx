import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    TextField,
    MenuItem,
    Switch,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Stepper,
    Step,
    StepLabel,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
// import GenerateIcon from '@mui/icons-material/Generate';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Edit as EditIcon,
//   GenerateGPT as GenerateIcon,
//   Check as CheckIcon,
//   Close as CloseIcon,
// } from '@mui/icons-material';

const EditTimetablegen = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [classValue, setClassValue] = useState('II Std A Sec');
    const [termValue, setTermValue] = useState('Term 1');
    // const [slotGroupValue, setSlotGroupValue] = useState('Primary Group');

    const [subjects, setSubjects] = useState([
        { id: 1, name: 'Mathematics', periods: 5 },
    ]);

    const [rules, setRules] = useState({
        noConsecutiveSameSubject: true,
        distributeEvenly: true,
        maxPeriodsPerTeacher: 3,
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [currentSubject, setCurrentSubject] = useState({ name: '', periods: '' });
    const [editingId, setEditingId] = useState(null);

    const steps = ['Configure', 'Timetable', 'Approved'];

    const handleAddSubject = () => {
        if (currentSubject.name.trim() && currentSubject.periods) {
            if (editingId) {
                setSubjects((prev) =>
                    prev.map((s) =>
                        s.id === editingId
                            ? { ...s, name: currentSubject.name, periods: parseInt(currentSubject.periods) }
                            : s
                    )
                );
                setEditingId(null);
            } else {
                setSubjects((prev) => [
                    ...prev,
                    {
                        id: Date.now(),
                        name: currentSubject.name,
                        periods: parseInt(currentSubject.periods),
                    },
                ]);
            }
            setCurrentSubject({ name: '', periods: '' });
            setOpenDialog(false);
        }
    };

    const handleEditSubject = (subject) => {
        setCurrentSubject({ name: subject.name, periods: subject.periods });
        setEditingId(subject.id);
        setOpenDialog(true);
    };

    const handleDeleteSubject = (id) => {
        setSubjects((prev) => prev.filter((s) => s.id !== id));
    };

    const handleRuleChange = (rule) => {
        setRules((prev) => ({ ...prev, [rule]: !prev[rule] }));
    };

    const handleGenerateTimetable = () => {
        setActiveStep(1);
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff', py: 2 }}>
            {/* Header Bar */}
            <Paper elevation={0} sx={{ backgroundColor: '#2c3e50', color: 'white', py: 2, px: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Auto timetable generator
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#bdc3c7', mt: 0.5 }}>
                            Subject and periods with rules section at bottom
                        </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#95a5a6' }}>
                        Academic Year 2025-27
                    </Typography>
                </Box>
            </Paper>

            <Box sx={{ maxWidth: 1100, mx: 'auto', px: 2 }}>
                {/* Stepper */}
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {index + 1} {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Configure Step */}
                {activeStep === 0 && (
                    <>
                        {/* Section 1: Class & Slot Group */}
                        <Paper elevation={0} sx={{ border: '1px solid #ecf0f1', borderRadius: 1, p: 3, mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: '#27ae60',
                                        mr: 1.5,
                                    }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                                    CLASS & SLOT GROUP
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#7f8c8d', display: 'block', mb: 1 }}>
                                        CLASS
                                    </Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        value={classValue}
                                        onChange={(e) => setClassValue(e.target.value)}
                                        variant="standard"
                                        size="small"
                                    >
                                        <MenuItem value="I Std A Sec">I Std A Sec</MenuItem>
                                        <MenuItem value="II Std A Sec">II Std A Sec</MenuItem>
                                        <MenuItem value="III Std A Sec">III Std A Sec</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#7f8c8d', display: 'block', mb: 1 }}>
                                        TERM
                                    </Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        value={termValue}
                                        onChange={(e) => setTermValue(e.target.value)}
                                        variant="standard"
                                        size="small"
                                    >
                                        <MenuItem value="Term 1">Term 1</MenuItem>
                                        <MenuItem value="Term 2">Term 2</MenuItem>
                                        <MenuItem value="Term 3">Term 3</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <CheckinAutocomplete

                                        sx={{ gridColumn: "span 2" }}
                                        name="Slotgroup"
                                        label={
                                            <>
                                                Slot Group
                                                <span style={{ color: "red", fontSize: "20px" }}>
                                                    *
                                                </span>
                                            </>
                                        }
                                        id="Slotgroup"
                                        value={values.Slotgroup}
                                        disabled={hasRows}
                                        onChange={(newValue) => {
                                            if (newValue) {
                                                setTermsIDPas(newValue.RecordID);
                                                setFieldValue("SlotRecordID", newValue.RecordID);
                                                setFieldValue("Slotgroup", newValue);
                                            } else {
                                                setFieldValue("Slotgroup", newValue);
                                            }
                                        }}
                                        error={!!touched.Slotgroup && !!errors.Slotgroup}
                                        helperText={touched.Slotgroup && errors.Slotgroup}
                                        // url={`${listViewurl}?data={"Query":{"AccessID":"2170","VerticalLicense":"${is003Subscription ? sliceSubscriptionCode : ""}","ScreenName":"Slotgroup","Filter":"CompanyID='${compID}'","Any":"","CompId":${compID}}}`}
                                        url={`${listViewurl}?data=${JSON.stringify({
                                            Query: {
                                                AccessID: "2171",
                                                ScreenName: "Slotgroup",
                                                VerticalLicense: Subscriptionlastthree,
                                                Filter: `CompanyID='${compID}'`,
                                                Any: "",
                                            },
                                        })}`}
                                    />
                                    {/* <Typography variant="caption" sx={{ fontWeight: 600, color: '#7f8c8d', display: 'block', mb: 1 }}>
                    SLOT GROUP
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    value={slotGroupValue}
                    onChange={(e) => setSlotGroupValue(e.target.value)}
                    variant="standard"
                    size="small"
                  >
                    <MenuItem value="Primary Group">Primary Group</MenuItem>
                    <MenuItem value="Secondary Group">Secondary Group</MenuItem>
                  </TextField> */}
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Section 2: Subjects & Periods */}
                        <Paper elevation={0} sx={{ border: '1px solid #ecf0f1', borderRadius: 1, p: 3, mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: '#27ae60',
                                            mr: 1.5,
                                        }}
                                    />
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                                        SUBJECTS & PERIODS PER WEEK
                                    </Typography>
                                </Box>
                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        setCurrentSubject({ name: '', periods: '' });
                                        setEditingId(null);
                                        setOpenDialog(true);
                                    }}
                                    sx={{
                                        backgroundColor: '#27ae60',
                                        color: 'white',
                                        '&:hover': { backgroundColor: '#229954' },
                                        textTransform: 'none',
                                    }}
                                    size="small"
                                >
                                    Add Subject
                                </Button>
                            </Box>

                            {subjects.length > 0 ? (
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: '#ecf0f1' }}>
                                                <TableCell sx={{ fontWeight: 700, color: '#2c3e50' }}>SUBJECT</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                                                    PERIODS / WEEK
                                                </TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                                                    ACTIONS
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {subjects.map((subject) => (
                                                <TableRow key={subject.id} sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}>
                                                    <TableCell>{subject.name}</TableCell>
                                                    <TableCell align="right">{subject.periods}</TableCell>
                                                    <TableCell align="center">
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleEditSubject(subject)}
                                                                sx={{ color: '#3498db' }}
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleDeleteSubject(subject.id)}
                                                                sx={{ color: '#e74c3c' }}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography variant="body2" color="textSecondary" sx={{ py: 3, textAlign: 'center' }}>
                                    No subjects added yet
                                </Typography>
                            )}
                        </Paper>

                        {/* Section 3: Generation Rules */}
                        <Paper elevation={0} sx={{ border: '1px solid #ecf0f1', borderRadius: 1, p: 3, mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: '#27ae60',
                                        mr: 1.5,
                                    }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                                    GENERATION RULES
                                </Typography>
                            </Box>

                            <Stack spacing={2}>
                                {/* Rule 1 */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pb: 2 }}>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                                            No consecutive same subject
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mt: 0.5 }}>
                                            Avoid placing the same subject back-to-back on the same day
                                        </Typography>
                                    </Box>
                                    <Switch
                                        checked={rules.noConsecutiveSameSubject}
                                        onChange={() => handleRuleChange('noConsecutiveSameSubject')}
                                        sx={{ ml: 2 }}
                                    />
                                </Box>

                                <Divider />

                                {/* Rule 2 */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', py: 2 }}>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                                            Distribute evenly across week
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mt: 0.5 }}>
                                            Spread each subject's periods uniformly across all days
                                        </Typography>
                                    </Box>
                                    <Switch
                                        checked={rules.distributeEvenly}
                                        onChange={() => handleRuleChange('distributeEvenly')}
                                        sx={{ ml: 2 }}
                                    />
                                </Box>

                                <Divider />

                                {/* Rule 3 */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pt: 2 }}>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                                            Max periods per teacher per day
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mt: 0.5 }}>
                                            Cap how many periods one teacher can take in a single day
                                        </Typography>
                                    </Box>
                                    <TextField
                                        type="number"
                                        value={rules.maxPeriodsPerTeacher}
                                        onChange={(e) =>
                                            setRules((prev) => ({
                                                ...prev,
                                                maxPeriodsPerTeacher: parseInt(e.target.value),
                                            }))
                                        }
                                        variant="standard"
                                        size="small"
                                        inputProps={{ min: 1, max: 10 }}
                                        sx={{ width: 80, textAlign: 'right', ml: 2 }}
                                    />
                                </Box>
                            </Stack>
                        </Paper>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    color: '#2c3e50',
                                    borderColor: '#bdc3c7',
                                    '&:hover': { borderColor: '#2c3e50', backgroundColor: '#f8f9fa' },
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                // startIcon={<GenerateIcon />}
                                onClick={handleGenerateTimetable}
                                sx={{
                                    backgroundColor: '#27ae60',
                                    '&:hover': { backgroundColor: '#229954' },
                                    textTransform: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Generate timetable
                            </Button>
                        </Box>
                    </>
                )}

                {/* Timetable Step */}
                {activeStep === 1 && (
                    <Paper elevation={0} sx={{ border: '1px solid #ecf0f1', borderRadius: 1, p: 4, textAlign: 'center', mb: 3 }}>
                        <Box sx={{ mb: 3 }}>
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    backgroundColor: '#27ae60',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2,
                                }}
                            >
                                <CheckIcon sx={{ color: 'white', fontSize: 32 }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
                                Timetable Generated Successfully
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Your timetable for {classValue} - {termValue} ({slotGroupValue}) has been
                                generated with all configured rules applied.
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="textSecondary">
                                    Total Subjects
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#27ae60' }}>
                                    {subjects.length}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="textSecondary">
                                    Total Periods/Week
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#27ae60' }}>
                                    {subjects.reduce((acc, s) => acc + s.periods, 0)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="textSecondary">
                                    Rules Applied
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#27ae60' }}>
                                    {Object.values(rules).filter(Boolean).length}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2" color="textSecondary">
                                    Status
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#27ae60' }}>
                                    Ready
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setActiveStep(0)}
                                sx={{
                                    color: '#2c3e50',
                                    borderColor: '#bdc3c7',
                                    '&:hover': { borderColor: '#2c3e50', backgroundColor: '#f8f9fa' },
                                }}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => setActiveStep(2)}
                                sx={{
                                    backgroundColor: '#27ae60',
                                    '&:hover': { backgroundColor: '#229954' },
                                    textTransform: 'none',
                                }}
                            >
                                Approve & Continue
                            </Button>
                        </Box>
                    </Paper>
                )}

                {/* Approved Step */}
                {activeStep === 2 && (
                    <Paper elevation={0} sx={{ border: '1px solid #ecf0f1', borderRadius: 1, p: 4, textAlign: 'center' }}>
                        <Box sx={{ mb: 3 }}>
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    backgroundColor: '#27ae60',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2,
                                }}
                            >
                                <CheckIcon sx={{ color: 'white', fontSize: 48 }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
                                Timetable Approved!
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
                                Your timetable is now ready to use. You can download, print, or share it.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    color: '#2c3e50',
                                    borderColor: '#bdc3c7',
                                    '&:hover': { borderColor: '#2c3e50' },
                                }}
                            >
                                Download PDF
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setActiveStep(0);
                                    setSubjects([]);
                                    setClassValue('II Std A Sec');
                                    setTermValue('Term 1');
                                    setSlotGroupValue('Primary Group');
                                }}
                                sx={{
                                    backgroundColor: '#27ae60',
                                    '&:hover': { backgroundColor: '#229954' },
                                    textTransform: 'none',
                                }}
                            >
                                Create New Timetable
                            </Button>
                        </Box>
                    </Paper>
                )}
            </Box>

            {/* Subject Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, backgroundColor: '#f8f9fa' }}>
                    {editingId ? 'Edit Subject' : 'Add Subject'}
                </DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <Stack spacing={2}>
                        <TextField
                            autoFocus
                            label="Subject Name"
                            fullWidth
                            value={currentSubject.name}
                            onChange={(e) =>
                                setCurrentSubject((prev) => ({ ...prev, name: e.target.value }))
                            }
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            label="Periods per Week"
                            type="number"
                            fullWidth
                            value={currentSubject.periods}
                            onChange={(e) =>
                                setCurrentSubject((prev) => ({ ...prev, periods: e.target.value }))
                            }
                            variant="outlined"
                            size="small"
                            inputProps={{ min: 1, max: 10 }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={() => setOpenDialog(false)}
                        sx={{ color: '#7f8c8d' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddSubject}
                        variant="contained"
                        sx={{
                            backgroundColor: '#27ae60',
                            '&:hover': { backgroundColor: '#229954' },
                        }}
                    >
                        {editingId ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EditTimetablegen;
