import { useState } from 'react';
import {Card, Text, Flex, CardHeader, Tooltip,} from '@chakra-ui/react';
import { BsFileEarmarkMedicalFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {FaCode, FaFileCode, FaFlagCheckered} from 'react-icons/fa';
import {FcApproval, FcAssistant, FcCancel, FcDisapprove, FcExpand, FcFile, FcHighPriority, FcInspection, FcSms} from 'react-icons/fc';
import { VscBlank } from 'react-icons/vsc';
import { MdRateReview } from 'react-icons/md';
import { IoPeople } from 'react-icons/io5';
import SubmissionModal from './SubmissionModal.jsx';
import {Icon} from "@chakra-ui/icons";

export default function Submissions({ submission, drop }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const { _id, p_id, p_name, f_name, submission_date, language, description, code, mode } = submission;
    const id = _id && _id['$oid'] ? _id['$oid'] : null;
    console.log(id);
    const typeIcon = mode === 1 ? <Icon as={FaCode} boxSize={25} color='blue.200' className="mr-2"/> : (mode === 2 ? <FcFile size="25px" /> : <BsFileEarmarkMedicalFill size="25px" />);
    const file_name = f_name === '' ? <Tooltip hasArrow label='Used paste code option' bg='blue.200'><Icon as={FcSms} boxSize={25}  className="mr-2"/></Tooltip> : (f_name);
    const dropType = drop === 0 ? <FcExpand size="25px" onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }} /> : <VscBlank size="25px" />;
    const codeType = code === 1 ? <FaFileCode size="25px" /> : (code === "" ? <FcHighPriority size="25px" /> : <FcApproval size="25px" />);
    const reviewType = code === 1 ? <MdRateReview size="25px" /> : (code === "" ? <FcHighPriority size="25px" /> : <FcInspection size="25px" />);
    const helpType = code === 1 ? <IoPeople size="25px" /> : (code === "" ? <FcCancel size="25px" /> : <FcAssistant size="25px" />);
    const lan = language === "Not given" ? <FcDisapprove size="25px" /> : language;
    const des = description === "Not given" ? <FcDisapprove size="25px" /> : description;

    return (
        <>
            <Card>
                <Flex flexDirection="row" className="bg-[#EBEBEB] mb-2 mt-1">
                    <CardHeader className="mr-4 w-[100px]">
                        <Tooltip hasArrow label='Code Upload / File Upload' bg='blue.200'>
                            {typeIcon}
                        </Tooltip>
                    </CardHeader>
                    <CardHeader className="mr-4 w-[150px]">
                        <Text className="font-bold" fontSize="16px">{p_id}</Text>
                    </CardHeader>
                    <CardHeader className="mr-4 w-[250px]">
                        <Text className="font-bold" fontSize="16px">{p_name}</Text>
                    </CardHeader>
                    <CardHeader className="mr-4 w-[250px]">
                        <Text className="font-bold" fontSize="16px">{file_name}</Text>
                    </CardHeader>
                    <CardHeader className="mr-4 w-[300px]">
                        <Text className="font-bold" fontSize="16px">{submission_date}</Text>
                    </CardHeader>
                    <CardHeader className="mr-4 w-[200px]">
                        <Text className="font-bold" fontSize="16px">{lan}</Text>
                    </CardHeader>
                    <CardHeader className="mr-4 w-[600px]">
                        <Text className="font-bold" fontSize="16px">{des}</Text>
                    </CardHeader>
                    <CardHeader>
                        {codeType}
                    </CardHeader>
                    <CardHeader>
                        {reviewType}
                    </CardHeader>
                    <CardHeader>
                        {helpType}
                    </CardHeader>
                    <CardHeader>
                        {dropType}
                    </CardHeader>
                </Flex>
            </Card>

            <SubmissionModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                p_name={p_name}
                code={code}
                des={description}
                entity_id={p_id}
            />

        </>
    );
}

// Add prop type validation
Submissions.propTypes = {
    submission: PropTypes.shape({
        _id: PropTypes.shape({
            $oid: PropTypes.string.isRequired
        }).isRequired,
        p_id: PropTypes.number.isRequired,
        p_name: PropTypes.string.isRequired,
        f_name: PropTypes.string.isRequired,
        submission_date: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        mode: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
    }).isRequired,
    drop: PropTypes.number.isRequired
};
