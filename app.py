import streamlit as st
import streamlit.components.v1 as components # Required for Scroll Fix
import time
from src.rag import create_retriever_pipeline as create_vector_store
from src.examiner import generate_questions, grade_answer, generate_followup_question

# --- PAGE CONFIG ---
st.set_page_config(
    page_title="Lexicognition AI | Viva Board", 
    layout="wide",
    initial_sidebar_state="expanded",
    page_icon="🎓"
)

# --- PROFESSIONAL CSS (Dark Mode Compatible) ---
st.markdown("""
<style>
    .stApp { background-color: #0e1117; }
    .stChatMessage {
        background-color: #1e2329;
        border: 1px solid #30363d;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 10px;
    }
    h1, h2, h3 {
        color: #e6edf3;
        font-family: 'Segoe UI', sans-serif;
    }
    section[data-testid="stSidebar"] {
        background-color: #161b22;
        border-right: 1px solid #30363d;
    }
    .verdict-pass { color: #2ea043; font-weight: bold; }
    .verdict-fail { color: #da3633; font-weight: bold; }
    .verdict-mid { color: #d29922; font-weight: bold; }
</style>
""", unsafe_allow_html=True)

# --- SESSION STATE ---
if "messages" not in st.session_state:
    st.session_state.messages = []
if "questions" not in st.session_state:
    st.session_state.questions = []
if "current_q_index" not in st.session_state:
    st.session_state.current_q_index = 0
if "exam_active" not in st.session_state:
    st.session_state.exam_active = False
if "retriever" not in st.session_state:
    st.session_state.retriever = None
if "current_evidence" not in st.session_state:
    st.session_state.current_evidence = None

# New State Variables for Logic Update
if "waiting_for_action" not in st.session_state:
    st.session_state.waiting_for_action = False # True when grading is done, waiting for button click
if "is_followup_active" not in st.session_state:
    st.session_state.is_followup_active = False # True if current question is a follow-up
if "last_critique" not in st.session_state:
    st.session_state.last_critique = "" # Stores feedback to generate follow-ups

# --- SIDEBAR ---
with st.sidebar:
    st.markdown("## 📋 Examination Controller")
    st.markdown("---")
    
    if not st.session_state.exam_active and not st.session_state.questions:
        st.info("Upload the 'Surprise PDF' to initialize the Viva Board.")
        uploaded_file = st.file_uploader("Research Paper (PDF)", type="pdf")
        
        if uploaded_file:
            if st.button("🚀 Initialize Viva System", type="primary"):
                with st.status("⚙️ Booting System & Hybrid Retina Layer...", expanded=True) as status:
                    st.write("Reading PDF Bytes...")
                    time.sleep(1)
                    st.write("Ingesting Text & Visuals (LlamaParse)...")
                    retriever = create_vector_store(uploaded_file)
                    st.session_state.retriever = retriever
                    
                    st.write("Constructing Atomic Index...")
                    st.write("Generating Conceptual Questions...")
                    
                    st.session_state.questions = generate_questions(retriever)
                    st.session_state.exam_active = True
                    st.session_state.waiting_for_action = False
                    
                    status.update(label="✅ System Ready", state="complete", expanded=False)
                    
                    q1 = st.session_state.questions[0]
                    welcome_msg = (
                        "**Examiner:** Welcome. I have analyzed the paper. Let us begin.\n\n"
                        f"**Question 1:** {q1}"
                    )
                    st.session_state.messages.append(
                        {"role": "assistant", "content": welcome_msg}
                    )
                    st.rerun()

    if st.session_state.exam_active:
        if st.session_state.is_followup_active:
             st.info("⚠️ FOLLOW-UP QUESTION ACTIVE")
        else:
            # DYNAMIC PROGRESS BAR: Adapts to 5 or 6 questions
            total_q = len(st.session_state.questions)
            if total_q > 0:
                progress = (st.session_state.current_q_index + 1) / total_q
                st.progress(progress, text=f"Question {st.session_state.current_q_index + 1} of {total_q}")
        
        st.markdown("### 🔍 Verified Evidence")
        if st.session_state.current_evidence:
            for i, doc in enumerate(st.session_state.current_evidence):
                page_num = doc.metadata.get('page', 'NA')
                source_name = doc.metadata.get('source', 'Paper')
                with st.expander(f"Reference {i+1} (Page {page_num})"):
                    st.caption(f"**Source:** {source_name}")
                    st.markdown(f"_{doc.page_content.strip()}_")
        else:
            st.info("Evidence will appear here after grading.")

    if st.button("🔄 Reset System"):
        st.session_state.clear()
        st.rerun()


# --- MAIN CONSOLE ---
st.title("Lexicognition AI")
st.markdown("### 🎓 Automated Viva Voce Board")
st.divider()

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])


# --- LOGIC HANDLERS ---

def finish_viva(skipped_last=False):
    """Ends the viva examination."""
    st.session_state.exam_active = False
    st.balloons()
    
    end_msg = "## 🏁 Viva Concluded\nThe Examiner has finished the evaluation."
    if skipped_last:
        end_msg += "\n\n*(Note: The exam ended because the final optional question was skipped.)*"
        
    st.session_state.messages.append({"role": "assistant", "content": end_msg})
    st.rerun()

def handle_next_question():
    """Moves to the next main question, handling dynamic list length (5 or 6)."""
    st.session_state.waiting_for_action = False
    st.session_state.is_followup_active = False
    st.session_state.current_evidence = None
    
    # Check against dynamic length instead of hardcoded '4'
    total_questions = len(st.session_state.questions)
    
    if st.session_state.current_q_index < (total_questions - 1):
        st.session_state.current_q_index += 1
        next_q = st.session_state.questions[st.session_state.current_q_index]
        
        # Add Special Label for the Visual Question (Index 5 = Question 6)
        q_label = f"Question {st.session_state.current_q_index + 1}"
        if st.session_state.current_q_index == 5:
            q_label += " (Visual Analysis)"
            
        next_q_msg = f"**{q_label}:** {next_q}"
        st.session_state.messages.append({"role": "assistant", "content": next_q_msg})
        st.rerun()
    else:
        # If we are at the last index and move next, we finish.
        finish_viva()

def handle_skip_question():
    """Records a skip and moves to the next question (or ends if last)."""
    st.session_state.messages.append({"role": "user", "content": "⏭️ *[Skipped Question]*"})
    st.session_state.messages.append({"role": "assistant", "content": "⚠️ **Question Skipped.** Moving to the next topic..."})
    
    # If it was the last question, handle_next_question will trigger finish_viva
    if st.session_state.current_q_index == len(st.session_state.questions) - 1:
        finish_viva(skipped_last=True)
    else:
        handle_next_question()

def handle_retry_submission():
    """Removes the last answer and grade, allowing re-submission."""
    # Remove Assistant's Grade
    if st.session_state.messages and st.session_state.messages[-1]["role"] == "assistant":
        st.session_state.messages.pop()
    # Remove User's Answer
    if st.session_state.messages and st.session_state.messages[-1]["role"] == "user":
        st.session_state.messages.pop()
        
    st.session_state.waiting_for_action = False
    st.rerun()

def handle_followup_question():
    """Generates a follow-up question based on the last critique."""
    st.session_state.waiting_for_action = False # Unlock input for the follow-up
    st.session_state.is_followup_active = True # Mark as follow-up mode
    
    # Get context
    if st.session_state.is_followup_active:
        current_q_text = st.session_state.messages[-4]["content"] # Approximate history lookup
    else:
        current_q_text = st.session_state.questions[st.session_state.current_q_index]

    # Generate the follow-up
    with st.spinner("Examiner is formulating a follow-up..."):
        # Retrieve evidence text from session or basic
        evidence_text = ""
        if st.session_state.current_evidence:
             evidence_text = "\n".join([d.page_content for d in st.session_state.current_evidence])
             
        # Extract last user answer (Assuming structure: Q -> A -> Grade)
        last_student_answer = st.session_state.messages[-2]["content"] 
        
        followup_q = generate_followup_question(
            current_q_text,
            last_student_answer,
            st.session_state.last_critique,
            evidence_text
        )
        
        msg = f"**Follow-up Question:** {followup_q}"
        st.session_state.messages.append({"role": "assistant", "content": msg})
        st.rerun()


# --- INPUT & ACTION AREA ---
if st.session_state.exam_active:
    
    # CASE 1: Waiting for User Answer
    if not st.session_state.waiting_for_action:
        
        # --- GENERAL SKIP LOGIC (All Questions) ---
        if st.button("⏭️ Skip Question", use_container_width=True, help="Skip this question and move to the next (or end exam if last)."):
            handle_skip_question()
        # ------------------------------------------

        user_input = st.chat_input("Type your answer to the Examiner...")
        
        if user_input:
            st.session_state.messages.append({"role": "user", "content": user_input})
            with st.chat_message("user"):
                st.markdown(user_input)
            
            # Determine which question is being answered (Main vs Follow-up)
            if st.session_state.is_followup_active:
                # The question is the last message from assistant
                current_q = st.session_state.messages[-2]["content"]
            else:
                idx = st.session_state.current_q_index
                current_q = st.session_state.questions[idx]
            
            with st.chat_message("assistant"):
                with st.status("⚖️ Consulting Adversarial Critic...", expanded=True):
                    result = grade_answer(
                        current_q,
                        user_input,
                        st.session_state.retriever
                    )
                    
                    feedback = result["feedback"]
                    perfect_baseline = result["perfect_answer"]
                    evidence_docs = result["docs"]
                    
                    # Store for follow-up generation logic
                    st.session_state.last_critique = feedback
                    
                    # Fetch crisp references for sidebar
                    from src.rag.retrieve import get_precise_references
                    st.session_state.current_evidence = get_precise_references(
                        current_q, 
                        st.session_state.retriever
                    )

                # Display Verdict
                if "PASS" in feedback.upper():
                    st.success(feedback, icon="✅")
                elif "FAIL" in feedback.upper():
                    st.error(feedback, icon="❌")
                else:
                    st.warning(feedback, icon="⚠️")

                with st.expander("🎓 View Examiner's Perfect Baseline"):
                    st.info(perfect_baseline)

                st.session_state.messages.append(
                    {"role": "assistant", "content": feedback}
                )
                st.session_state.messages.append(
                    {"role": "assistant", "content": f"**Perfect Baseline:** {perfect_baseline}"}
                )
            
            # Change state to waiting for button action
            st.session_state.waiting_for_action = True
            st.rerun()

    # CASE 2: Grading Done, Show Buttons
    else:
        col1, col2, col3 = st.columns(3)
        
        with col1:
            if st.button("🔄 Retry Submission", use_container_width=True):
                handle_retry_submission()
        
        with col2:
            # Follow-up allowed only if NOT already in follow-up mode
            if not st.session_state.is_followup_active:
                if st.button("🧐 Follow-up Question", use_container_width=True):
                    handle_followup_question()
            else:
                st.button("🧐 Follow-up (Max Depth Reached)", disabled=True, use_container_width=True)

        with col3:
            if st.button("➡️ Next Question", type="primary", use_container_width=True):
                handle_next_question()

# --- AUTO-SCROLL FIX ---
if st.session_state.waiting_for_action:
    js = """
    <script>
        var body = window.parent.document.querySelector("section.main");
        body.scrollTop = body.scrollHeight;
    </script>
    """
    components.html(js, height=0)