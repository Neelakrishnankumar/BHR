import React, { memo } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";

const SessionAccordion = ({
    subject,
    sessions,
    expanded,
    onExpand,
    onEdit,
}) => {
    const prev = React.useRef({});

React.useEffect(() => {
    console.log(subject, {
        sessions: prev.current.sessions === sessions,
        expanded: prev.current.expanded === expanded,
        onExpand: prev.current.onExpand === onExpand,
        onEdit: prev.current.onEdit === onEdit,
    });

    prev.current = {
        sessions,
        expanded,
        onExpand,
        onEdit,
    };
});
    console.count(`Accordion Render : ${subject}`);

    return (
        <Accordion
            expanded={expanded}
            // onChange={onExpand(subject)}
            onChange={(event, isExpanded) =>
                onExpand(subject, isExpanded)
            }
            sx={{ mb: 1 }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>
                    {subject}
                </Typography>

                <Chip
                    label={sessions.length}
                    size="small"
                    sx={{ ml: 1.5 }}
                />
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
                <List disablePadding>
                    {sessions.map((session, idx) => (
                        <React.Fragment key={session.recordID}>
                            <ListItem
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        onClick={() => onEdit(session)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={session.sessionDescription}
                                    secondary={`${session.Date} • ${session.Teacher}`}
                                />
                            </ListItem>

                            {idx < sessions.length - 1 && (
                                <Divider component="li" />
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
};

export default memo(SessionAccordion);